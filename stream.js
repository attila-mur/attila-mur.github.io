const stream = document.getElementById("stream");

const MAX_ITEMS = 12;
const FADE_START_INDEX = 7;

async function fetchLatestWikipediaEdit() {
  try {
    const res = await fetch(
      "https://en.wikipedia.org/w/api.php?" +
        new URLSearchParams({
          action: "query",
          list: "recentchanges",
          rcprop: "title",
          rclimit: "1",
          format: "json",
          origin: "*"
        })
    );

    const data = await res.json();
    const title = data.query.recentchanges[0]?.title;

    if (title) addTitle(title);
  } catch {}
}

function addTitle(title) {
  const li = document.createElement("li");
  li.textContent = title;
  stream.prepend(li);

  while (stream.children.length > MAX_ITEMS) {
    stream.removeChild(stream.lastChild);
  }

  applyFade();
}

function applyFade() {
  Array.from(stream.children).forEach((item, index) => {
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

fetchLatestWikipediaEdit();
setInterval(fetchLatestWikipediaEdit, 3000);
