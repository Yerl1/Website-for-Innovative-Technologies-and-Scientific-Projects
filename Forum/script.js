const THREADS_KEY = 'threads';

// Retrieve threads from localStorage.
function loadThreads() {
  const threadsJSON = localStorage.getItem(THREADS_KEY);
  if (!threadsJSON) return [];
  try {
    return JSON.parse(threadsJSON);
  } catch (error) {
    console.error("Error parsing threads:", error);
    return [];
  }
}

// Save the threads array to localStorage.
function saveThreads(threads) {
  localStorage.setItem(THREADS_KEY, JSON.stringify(threads));
}

// Render all threads in the #threads container.
function renderThreads() {
  const threads = loadThreads();
  const threadsContainer = document.getElementById('threads');
  threadsContainer.innerHTML = ''; // Clear existing threads

  if (threads.length === 0) {
    threadsContainer.innerHTML = '<p>No discussions available yet.</p>';
    return;
  }

  threads.forEach(thread => {
    const threadDiv = document.createElement('div');
    threadDiv.className = 'thread';
    threadDiv.innerHTML = `
          <h3>${thread.title}</h3>
          <span class="badge bg-secondary">Category: ${thread.category}</span>
          <p>${thread.message}</p>
        `;
    threadsContainer.appendChild(threadDiv);
  });
}

// Wait for the DOM to load before running scripts.
document.addEventListener('DOMContentLoaded', () => {
  // Render threads on initial load.
  renderThreads();

  // Listen for new thread submissions.
  document.getElementById('newThreadForm').addEventListener('submit', function (event) {
    event.preventDefault();

    // Get input values.
    const title = document.getElementById('threadTitle').value.trim();
    const category = document.getElementById('threadCategory').value;
    const message = document.getElementById('threadMessage').value.trim();

    if (!title || !category || !message) return;

    const newThread = { title, category, message };

    // Save new thread at the beginning of the threads array.
    const threads = loadThreads();
    threads.unshift(newThread);
    saveThreads(threads);

    // Re-render the threads.
    renderThreads();

    // Clear the form.
    this.reset();
  });
});