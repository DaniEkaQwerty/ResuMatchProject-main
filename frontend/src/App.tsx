// import React, { useState } from "react";

// export default function App() {
//   const [files, setFiles] = useState<File[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [result, setResult] = useState<any>(null);
//   const [expectedSkills, setExpectedSkills] = useState<string>("");

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) setFiles(Array.from(e.target.files));
//   };

//   const analyzeResume = async () => {
//     if (files.length === 0) {
//       alert("Upload at least one PDF!");
//       return;
//     }

//     if (!expectedSkills.trim()) {
//       alert("Please enter expected skills first!");
//       return;
//     }

//     setLoading(true);
//     setResult(null);

//     const formData = new FormData();
//     files.forEach((f) => formData.append("files", f));

//     // always send lowercase
//     formData.append("expected_skills", expectedSkills.toLowerCase());

//     try {
//       const res = await fetch("http://localhost:5000/analyze", {
//         method: "POST",
//         body: formData,
//       });
//       const json = await res.json();
//       setResult(json);
//     } catch (err) {
//       console.error(err);
//       alert("Backend error.");
//     }

//     setLoading(false);
//   };

//   return (
//     <div className="min-h-screen bg-white px-12 py-5 font-sans">
//       {/* Logo */}
//       <div className="text-2xl font-semibold tracking-tight mb-1">
//         Resumatch
//       </div>

//       {/* Header */}
//       <header className="text-center mt-2 mb-6">
//         <h1 className="text-4xl font-bold tracking-tight text-gray-900">
//           Resumatch Analysis
//         </h1>
//         <p className="text-gray-500 mt-2 text-s">
//           Go ahead and upload your resume and get insightful feedback made by{" "}
//           <span className="font-bold">Andreas, Danieka, and Ray!</span>
//         </p>
//       </header>

//       {/* MAIN CARD */}
//       <div className="mt-6 max-w-[1500px] mx-auto flex gap-8">
//         {/* LEFT PURPLE CARD */}
//         <div className="w-1/3 bg-purple-300/60 rounded-3xl p-10 shadow-md">
//           <div className="max-w-[90%] mx-auto">
//             <h3 className="font-semibold text-2xl mb-6">Requirements</h3>

//             <ol className="space-y-8 text-base leading-relaxed">
//               <li>
//                 <b className="text-lg">1. Upload Resume</b>
//                 <p className="text-gray-700 mt-1">
//                   Drag and drop your resume or select from your device.
//                 </p>
//               </li>

//               <li>
//                 <b className="text-lg">2. Wait for Progress</b>
//                 <p className="text-gray-700 mt-1">
//                   Our AI will analyze your resume.
//                 </p>
//               </li>

//               <li>
//                 <b className="text-lg">3. Review Insights</b>
//                 <p className="text-gray-700 mt-1">
//                   Get a detailed report of your resume!
//                 </p>
//               </li>
//             </ol>
//           </div>
//         </div>

//         {/* RIGHT WHITE CARD */}
//         <div className="w-2/3 bg-gray-100 rounded-3xl p-12 shadow-md">
//           <div className="bg-white p-10 rounded-3xl border shadow-sm">
//             {/* Expected Skills Input */}
//             <h3 className="text-2xl font-semibold text-center mb-5">
//               Expected Skills
//             </h3>

//             <input
//               type="text"
//               placeholder="e.g. Java, React, Spring Boot"
//               value={expectedSkills}
//               onChange={
//                 (e) => setExpectedSkills(e.target.value.toLowerCase()) // ALWAYS lowercase
//               }
//               className="w-full p-3 border rounded-xl mb-6 text-lg"
//             />

//             {/* Upload */}
//             <div className="text-center">
//               <label className="inline-block bg-purple-500 hover:bg-purple-600 transition text-white px-7 py-3 rounded-xl cursor-pointer text-lg">
//                 Browse Files
//                 <input
//                   type="file"
//                   accept="application/pdf"
//                   multiple
//                   onChange={handleFileChange}
//                   className="hidden"
//                 />
//               </label>
//             </div>

//             {/* Selected Files */}
//             {files.length > 0 && (
//               <ul className="list-disc ml-6 mt-6 text-purple-700 text-lg">
//                 {files.map((f, i) => (
//                   <li key={i}>{f.name}</li>
//                 ))}
//               </ul>
//             )}

//             {/* Analyze Button */}
//             <div className="mt-10 text-center">
//               <button
//                 onClick={analyzeResume}
//                 disabled={!expectedSkills.trim()}
//                 className={`px-10 py-4 rounded-2xl text-lg font-semibold shadow-md text-white
//                 ${
//                   expectedSkills.trim()
//                     ? "bg-purple-600 hover:bg-purple-700 transition"
//                     : "bg-gray-400 cursor-not-allowed"
//                 }`}
//               >
//                 {loading ? "Analyzing..." : "ANALYZE"}
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* RESULTS */}
//       {result && (
//         <div className="mt-16 max-w-4xl mx-auto space-y-6 mb-10">
//           {result.resumes?.map((res: any, idx: number) => (
//             <div
//               key={idx}
//               className="bg-white p-8 rounded-3xl shadow-lg border"
//             >
//               <div className="flex justify-between">
//                 <div>
//                   <h3 className="font-bold text-xl">{res.filename}</h3>
//                   <p className="text-gray-500 text-sm">{res.message}</p>
//                 </div>

//                 <div className="text-right">
//                   <div className="text-sm text-gray-500">Score</div>
//                   <div
//                     className={`text-3xl font-bold ${
//                       res.matching_score >= 55
//                         ? "text-green-600"
//                         : "text-red-600"
//                     }`}
//                   >
//                     {res.matching_score}%
//                   </div>
//                   <div
//                     className={`text-lg font-semibold ${
//                       res.recommendation === "Recommended"
//                         ? "text-green-600"
//                         : "text-red-600"
//                     }`}
//                   >
//                     {res.recommendation}
//                   </div>
//                 </div>
//               </div>

//               {!res.error && (
//                 <>
//                   <p className="mt-5 text-lg">
//                     <b>Email:</b> {res.email || "Not found"}
//                   </p>
//                   <p className="text-lg">
//                     <b>Phone:</b> {res.phone || "Not found"}
//                   </p>

//                   <p className="mt-6 font-semibold text-lg">Skills Found:</p>
//                   <ul className="list-disc ml-6 text-base">
//                     {res.skills_found?.map((s: string, i: number) => (
//                       <li key={i}>{s}</li>
//                     ))}
//                   </ul>

//                   <p className="mt-6 font-semibold text-lg">Educatio:</p>
//                   <ul className="list-disc ml-6 text-base">
//                     {res.education_found?.map((e: string, i: number) => (
//                       <li key={i}>{e}</li>
//                     ))}
//                   </ul>

//                   <p className="mt-6 text-sm">
//                     <b>Preview:</b>{" "}
//                     <span className="text-gray-700">
//                       {res.text_preview?.slice(0, 400)}
//                     </span>
//                   </p>
//                 </>
//               )}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

import React, { useState } from "react";

type FileItem = {
  id: string;
  file: File;
  name: string;
  size: number;
  status: "pending" | "uploading" | "done" | "error";
  progress?: number; // reserved if you want to show progress later
  result?: any; // backend response for this file
  errorMsg?: string;
};

export default function App() {
  const [items, setItems] = useState<FileItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [expectedSkills, setExpectedSkills] = useState<string>("");

  // helper to create small unique id
  const uid = () =>
    Math.random().toString(36).slice(2, 9) + "-" + Date.now().toString(36).slice(-4);

  // Add new files to the existing list (avoid duplicates by name+size)
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const newFiles = Array.from(e.target.files);

    setItems((prev) => {
      const mapExisting = new Map(prev.map((p) => [p.name + "_" + p.size, true]));
      const added: FileItem[] = [];
      for (const f of newFiles) {
        const key = f.name + "_" + f.size;
        if (!mapExisting.has(key)) {
          added.push({
            id: uid(),
            file: f,
            name: f.name,
            size: f.size,
            status: "pending",
          });
        }
      }
      return [...prev, ...added];
    });

    // reset input so the same file can be re-picked later if user wants
    e.currentTarget.value = "";
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((p) => p.id !== id));
  };

  // Analyze sequentially: send each file in its own POST request
  const analyzeSequential = async () => {
    if (items.length === 0) {
      alert("Upload minimal satu CV dulu!");
      return;
    }
    if (!expectedSkills.trim()) {
      alert("Isi expected skills dulu!");
      return;
    }

    setLoading(true);

    // copy to avoid race with UI actions
    const snapshot = [...items];

    for (const it of snapshot) {
      // update status -> uploading
      setItems((prev) => prev.map((p) => (p.id === it.id ? { ...p, status: "uploading" } : p)));

      const formData = new FormData();
      // backend accepts "files" list; we send single file under that key
      formData.append("files", it.file);
      formData.append("expected_skills", expectedSkills.toLowerCase());

      try {
        const res = await fetch("http://localhost:5000/analyze", {
          method: "POST",
          body: formData,
        });

        if (!res.ok) {
          const txt = await res.text();
          throw new Error(`HTTP ${res.status}: ${txt}`);
        }

        const json = await res.json();

        // backend returns { batch_id, resumes: [...] } — since we send single file, expect one result in resumes[0]
        const fileResult = Array.isArray(json.resumes) && json.resumes.length > 0 ? json.resumes[0] : json;

        setItems((prev) =>
          prev.map((p) =>
            p.id === it.id
              ? { ...p, status: "done", result: fileResult, errorMsg: undefined }
              : p
          )
        );
      } catch (err: any) {
        console.error("Analyze error for", it.name, err);
        setItems((prev) =>
          prev.map((p) =>
            p.id === it.id
              ? { ...p, status: "error", errorMsg: err?.message || "Unknown error" }
              : p
          )
        );
      }

      // small delay optionally so UI updates nicely (not required)
      await new Promise((r) => setTimeout(r, 200));
    }

    setLoading(false);
  };

  // Optionally: analyze all in one request (commented) — but user requested bergantian so we use sequential above
  const analyzeAllAtOnce = async () => {
    if (items.length === 0) return;
    if (!expectedSkills.trim()) return;

    setLoading(true);
    const formData = new FormData();
    items.forEach((it) => formData.append("files", it.file));
    formData.append("expected_skills", expectedSkills.toLowerCase());

    try {
      const res = await fetch("http://localhost:5000/analyze", {
        method: "POST",
        body: formData,
      });
      const json = await res.json();

      // json.resumes is array with same order as sent files (generally)
      if (Array.isArray(json.resumes)) {
        setItems((prev) =>
          prev.map((p) => {
            const matched = json.resumes.find((r: any) => r.filename === p.name);
            if (matched) return { ...p, status: "done", result: matched };
            return p;
          })
        );
      }
    } catch (err) {
      console.error(err);
      alert("Error saat analyze all at once");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-white px-8 py-6 font-sans">
      <div className="text-3xl font-bold mb-2">Resumatch Analysis</div>
      <p className="text-gray-600 mb-6">
        Upload multiple CVs, remove any before analyzing, and analyze one-by-one.
      </p>

      <div className="grid grid-cols-3 gap-6">
        {/* Left card */}
        <div className="col-span-1 bg-purple-200 p-6 rounded-xl">
          <h3 className="font-semibold text-lg mb-4">Requirements</h3>
          <ol className="text-sm space-y-3">
            <li>1. Upload Resume (multiple allowed)</li>
            <li>2. Remove unwanted files</li>
            <li>3. Klik ANALYZE untuk proses bergantian</li>
          </ol>
        </div>

        {/* Right card */}
        <div className="col-span-2 bg-gray-50 p-8 rounded-xl">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-center font-semibold text-xl mb-4">Expected Skills</h3>
            <input
              type="text"
              placeholder="e.g. java, react, spring boot"
              value={expectedSkills}
              onChange={(e) => setExpectedSkills(e.target.value.toLowerCase())}
              className="w-full p-3 border rounded-lg mb-4"
            />

            <div className="flex items-center gap-4 mb-4">
              <label className="inline-block bg-purple-600 text-white px-5 py-2 rounded-lg cursor-pointer">
                Browse Files
                <input
                  type="file"
                  accept="application/pdf"
                  multiple
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>

              <button
                onClick={analyzeSequential}
                disabled={loading || items.length === 0 || !expectedSkills.trim()}
                className={`px-6 py-2 rounded-lg text-white font-semibold ${
                  loading || items.length === 0 || !expectedSkills.trim()
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-purple-600 hover:bg-purple-700"
                }`}
              >
                {loading ? "Processing..." : "ANALYZE (sekuensial)"}
              </button>

              {/* optional: analyze all at once */}
              <button
                onClick={analyzeAllAtOnce}
                disabled={loading || items.length === 0 || !expectedSkills.trim()}
                className="px-4 py-2 rounded-lg bg-gray-200 text-gray-800"
                title="Kirim semua file sekaligus (opsional)"
              >
                ANALYZE (all-at-once)
              </button>
            </div>

            {/* Selected files */}
            <div className="mt-4">
              <h4 className="font-semibold mb-2">Selected files</h4>
              {items.length === 0 ? (
                <p className="text-sm text-gray-500">No files selected</p>
              ) : (
                <ul className="space-y-3">
                  {items.map((it) => (
                    <li
                      key={it.id}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-md border"
                    >
                      <div>
                        <div className="font-medium">{it.name}</div>
                        <div className="text-xs text-gray-500">
                          {Math.round(it.size / 1024)} KB •{" "}
                          <span
                            className={
                              it.status === "pending"
                                ? "text-yellow-600"
                                : it.status === "uploading"
                                ? "text-blue-600"
                                : it.status === "done"
                                ? "text-green-600"
                                : "text-red-600"
                            }
                          >
                            {it.status}
                          </span>
                        </div>

                        {it.status === "error" && it.errorMsg && (
                          <div className="text-xs text-red-600 mt-1">{it.errorMsg}</div>
                        )}
                      </div>

                      <div className="flex items-center gap-3">
                        {it.status === "done" && it.result && (
                          <button
                            onClick={() =>
                              alert(JSON.stringify(it.result, null, 2))
                            }
                            className="px-3 py-1 bg-green-600 text-white rounded-md text-sm"
                          >
                            View
                          </button>
                        )}

                        <button
                          onClick={() => removeItem(it.id)}
                          disabled={loading && it.status === "uploading"}
                          className="px-3 py-1 bg-red-400 text-white rounded-md text-sm disabled:opacity-50"
                        >
                          Remove
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Results — after processed */}
            <div className="mt-6">
              <h4 className="font-semibold mb-3">Results (per-file)</h4>
              <div className="space-y-4">
                {items
                  .filter((i) => i.status === "done" && i.result)
                  .map((i) => (
                    <div key={i.id} className="p-4 border rounded-md bg-white">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-bold">{i.name}</div>
                          <div className="text-sm text-gray-500">
                            Score:{" "}
                            <span className="font-semibold">
                              {i.result.matching_score ?? i.result.score ?? "N/A"}%
                            </span>{" "}
                            • {i.result.recommendation ?? ""}
                          </div>
                        </div>

                        <div className="text-right">
                          <div className="text-sm text-gray-600">Field:</div>
                          <div className="font-semibold">
                            {i.result.predicted_field ?? i.result.prediction ?? "-"}
                          </div>
                        </div>
                      </div>

                      <div className="mt-3 text-sm">
                        <div><b>Email:</b> {i.result.email ?? "Not found"}</div>
                        <div><b>Phone:</b> {i.result.phone ?? "Not found"}</div>

                        <div className="mt-2">
                          <b>Skills:</b>
                          <ul className="list-disc ml-6">
                            {(i.result.skills_found ?? []).map((s: string, idx: number) => (
                              <li key={idx} className="text-sm">{s}</li>
                            ))}
                          </ul>
                        </div>

                        <div className="mt-2">
                          <b>Preview:</b>
                          <div className="text-xs text-gray-700 mt-1">
                            {(i.result.text_preview ?? "").slice(0, 400)}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
