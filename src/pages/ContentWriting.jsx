import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import api from "../utils/api";
import BackNavigation from "../components/BackNavigation";
import NebulaBackground from "../components/NebulaBackground";

function ContentWriting() {

  const fileInputRef = useRef(null);
  const [pdfs, setPdfs] = useState([]);
  
  // JWT-based admin check
  const isAdmin = !!localStorage.getItem("token");

  const fetchPdfs = async () => {
    const res = await api.get("/pdfs");
    setPdfs(res.data);
  };

  useEffect(() => {
    fetchPdfs();
  }, []);

  async function addPdf(event) {
    const file = event.target.files[0];
    if (!file) return;

    // Check if file is PDF
    if (file.type !== 'application/pdf') {
      alert('Please select a PDF file');
      return;
    }

    const title = prompt("Enter PDF Title:");
    if (!title) return;

    // Create FormData for file upload
    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', title);

    try {
      await api.post("/pdfs", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      fetchPdfs();
      alert('PDF uploaded successfully!');
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Failed to upload PDF');
    }

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }

  async function deletePdf(id) {
    if (!confirm('Are you sure you want to delete this PDF?')) return;

    await api.delete(`/pdfs/${id}`);
    fetchPdfs();
  }

  async function handleDownload(pdfUrl, title) {
    try {
      console.log('Attempting to download:', pdfUrl);
      
      // Method 1: Try direct download with proper headers
      const response = await fetch(pdfUrl, {
        method: 'GET',
        mode: 'cors'
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      // Get the blob
      const blob = await response.blob();
      
      // Check if it's actually a PDF
      if (blob.type !== 'application/pdf' && !pdfUrl.includes('.pdf')) {
        console.warn('Warning: Blob type is not PDF:', blob.type);
      }
      
      // Create blob URL
      const blobUrl = window.URL.createObjectURL(blob);
      
      // Create download link
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = `${title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.pdf`;
      link.style.display = 'none';
      
      // Trigger download
      document.body.appendChild(link);
      link.click();
      
      // Cleanup
      setTimeout(() => {
        document.body.removeChild(link);
        window.URL.revokeObjectURL(blobUrl);
      }, 100);
      
      console.log('Download triggered successfully');
      
    } catch (error) {
      console.error('Download failed:', error);
      
      // Fallback 1: Try opening in new tab with download parameter
      try {
        const fallbackUrl = `${pdfUrl}?download=1`;
        window.open(fallbackUrl, '_blank');
      } catch (fallbackError) {
        // Fallback 2: Just open in new tab
        window.open(pdfUrl, '_blank');
      }
    }
  }

  // Get file size from URL (approximate)
  function getFileSize(url) {
    // This is a placeholder - in a real app you might get this from the API
    return '~1.5 MB';
  }

  // Get upload date (placeholder)
  function getUploadDate() {
    return new Date().toLocaleDateString();
  }

  return (
    <>
      <NebulaBackground />
      <div className="min-h-screen px-6 py-20 text-white relative z-10">

        <div className="max-w-7xl mx-auto">

          <BackNavigation />

          <h1 className="text-4xl font-bold text-purple-400 mb-12">
            Content Writing
          </h1>

          {isAdmin && (
            <div className="mb-10">
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf"
                onChange={addPdf}
                style={{ display: 'none' }}
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="bg-green-500 px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
              >
                Upload PDF
              </button>
            </div>
          )}

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

            {pdfs.map((pdf, index) => (
              <motion.div
                key={pdf._id}
                className="backdrop-blur-md bg-white/5 border border-purple-500/30 rounded-xl p-6 hover:shadow-purple-500/30 transition-all hover:scale-105"
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
              >

                {/* PDF ICON AND INFO */}
                
                <div className="flex flex-col items-center mb-6">
                  <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mb-4">
                    <span className="text-purple-300 font-bold text-xl">MP</span>
                  </div>
                  
                  <h3 className="text-base font-semibold text-purple-300 mb-2 text-center">
                    {pdf.title}
                  </h3>
                </div>

                {/* ACTION BUTTONS */}

                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => handleDownload(pdf.file, pdf.title)}
                    className="flex items-center justify-center gap-2 text-xs bg-purple-500/20 px-3 py-2 rounded-md hover:bg-purple-500/40 transition w-full"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Download PDF
                  </button>

                  {isAdmin && (
                    <button
                      onClick={() => deletePdf(pdf._id)}
                      className="flex items-center justify-center gap-2 bg-red-500 px-3 py-2 rounded text-xs text-white hover:bg-red-600 transition-colors w-full"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Delete
                    </button>
                  )}
                </div>

              </motion.div>
            ))}

          </div>

        </div>

      </div>
    </>
  );
}

export default ContentWriting;