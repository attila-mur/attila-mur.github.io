const container = document.getElementById("stream");
const MAX_LINES = 200;

function addLine(text) {
  container.textContent += text + "\n";

  const lines = container.textContent.split("\n");
  if (lines.length > MAX_LINES) {
    container.textContent = lines.slice(lines.length - MAX_LINES).join("\n");
  }

  container.scrollTop = container.scrollHeight;
}

function formatLog(change) {
  const time = new Date(change.timestamp).toLocaleTimeString();
  const size = change.newlen - change.oldlen;
  const sign = size >= 0 ? "+" : "";
  return `[${time}] ${change.type.toUpperCase()} ${change.title} (${sign}${size} bytes)`;
}

async function fetchWikipedia() {
  try {
    const res = await fetch(
      "https://en.wikipedia.org/w/api.php?" +
        new URLSearchParams({
          action: "query",
          list: "recentchanges",
          rcprop: "title|timestamp|sizes|type",
          rclimit: "10",
          format: "json",
          origin: "*"
        })
    );

    const data = await res.json();
    data.query.recentchanges.forEach(change => {
      addLine(formatLog(change));
    });
  } catch (err) {
    addLine(`[ERROR] wikipedia fetch failed`);
  }
}

// Initial fill
setInterval(fetchWikipedia, 3000);
fetchWikipedia();

