function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  function analyze() {
    const device = document.getElementById("device").value;
    const network = document.getElementById("network").value;
  
    // Base values
    let baseLCP = device === "mobile" ? 2800 : 1800;
    let baseFID = device === "mobile" ? 120 : 60;
  
    if (network === "4g") baseLCP += 600;
    if (network === "3g") baseLCP += 1500;
  
    const lcp = random(baseLCP - 200, baseLCP + 400);
    const fid = random(baseFID - 20, baseFID + 60);
    const cls = (Math.random() * 0.25).toFixed(2);
  
    document.getElementById("lcp").innerText = lcp + " ms";
    document.getElementById("fid").innerText = fid + " ms";
    document.getElementById("cls").innerText = cls;
  
    let score = 100;
    if (lcp > 2500) score -= 30;
    if (fid > 100) score -= 20;
    if (cls > 0.1) score -= 20;
  
    updateGauge(score);
    generateSuggestions(lcp, fid, cls);
  }
  
  function updateGauge(score) {
    document.getElementById("perfScore").innerText = score;
    const circle = document.getElementById("perfCircle");
    const offset = 314 - (314 * score) / 100;
    circle.style.strokeDashoffset = offset;
  
    circle.style.stroke =
      score > 80 ? "#22c55e" : score > 50 ? "#facc15" : "#ef4444";
  }
  
  function generateSuggestions(lcp, fid, cls) {
    const list = document.getElementById("suggestions");
    list.innerHTML = "";
  
    if (lcp > 2500)
      list.innerHTML += "<li>Optimize hero images and preload fonts</li>";
  
    if (fid > 100)
      list.innerHTML += "<li>Reduce JavaScript execution and third-party scripts</li>";
  
    if (cls > 0.1)
      list.innerHTML += "<li>Set fixed width/height for images and ads</li>";
  
    if (!list.innerHTML)
      list.innerHTML = "<li>Excellent performance 🎉</li>";
  }
  
  /* PDF EXPORT */
  function exportPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
  
    doc.text("Website Performance Report", 20, 20);
    doc.text("Performance Score: " + perfScore.innerText, 20, 40);
    doc.text("LCP: " + lcp.innerText, 20, 55);
    doc.text("FID: " + fid.innerText, 20, 70);
    doc.text("CLS: " + cls.innerText, 20, 85);
  
    doc.save("performance-report.pdf");
  }
  