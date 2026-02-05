const stream = document.getElementById("stream");
const MAX_ITEMS = 30;
const FADE_START = 0.6; // bottom 40% fades

function addTitle(title) {
  const li = document.createElement("li");
  li.textContent = title;

  // Add to top
  stream.prepend(li);

  // Trim list
  while (stream.children.length > MAX_ITEMS) {
    stream.removeChild(stream.lastChild);
  }

  applyFade();
}

function applyFade() {
  const items = Array.from(stream.children);
  const total = items.length;

  items.forEach((item, index) => {
    const position = index / total;
    if (position > FADE_START) {
      const fade =
        1 - (position - FADE_START) / (1 - FADE_START);
      item.style.opacity = fade.toFixed(2);
    } else {
      item.style.opacity = 1;
    }
  });
}

async function fetchWikipedia() {
  try {
    const res = await fetch(
      "https://en.wikipedia.org/w/api.php?" +
        new URLSearchParams({
          action: "query",
          list: "recentchanges",
          rcprop: "title",
          rclimit: "10",
          format: "json",
          origin: "*"
        })
    );

    const data = await res.json();
    data.query.recentchanges.forEach(change => {
      addTitle(change.title);
    });
  } catch {
    addTitle("…");
  }
}

// Start stream
fetchWikipedia();
setInterval(fetchWikipedia, 4000);

