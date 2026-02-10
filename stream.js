const stream = document.getElementById("stream");

const MAX_ITEMS = 12;        // controls how many titles are visible
const FADE_START_INDEX = 7; // when fading begins (0 = top)

async function fetchLatestWikipediaEdit() {
  try {
    const res = await fetch(
      "https://en.wikipedia.org/w/api.php?" +
        new URLSearchParams({
          action: "query",
          list: "recentchanges",
          rcprop: "title",
          rclimit: "1", // 👈 only the latest edit
          format: "json",
          origin: "*"
        })
    );

    const data = await res.json();
    const title = data.query.recentchanges[0]?.title;

    if (title) addTitle(title);
  } catch {
    // fail silently — this is ambient, not critical
  }
}

function addTitle(title) {
  const li = document.createElement("li");
  li.textContent = title;

  // Add newest to top
  stream.prepend(li);

  // Trim excess items
  while (stream.children.length > MAX_ITEMS) {
    stream.removeChild(stream.lastChild);
  }

  applyFade();
}

function applyFade() {
  const items = Array.from(stream.children);

  items.forEach((item, index) => {
    if (index < FADE_START_INDEX) {
      item.style.opacity = "1";
    } else {
      const fadeRange = MAX_ITEMS - FADE_START_INDEX;
      const fadeStep = index - FADE_START_INDEX;
      const opacity = 1 - fadeStep / fadeRange;
      item.style.opacity = Math.max(opacity, 0).toFixed(2);
    }
  });
}

// Prime the stream
fetchLatestWikipediaEdit();
setInterval(fetchLatestWikipediaEdit, 3000);

