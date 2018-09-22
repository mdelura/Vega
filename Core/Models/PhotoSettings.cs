using System;
using System.IO;
using System.Linq;

namespace Vega.Core.Models
{
    public class PhotoSettings
    {
        public int MaxBytes { get; set; }
        public string[] AcceptedFileTypes { get; set; }

        public bool IsAcceptedFileType(string fileName) => AcceptedFileTypes.Contains(Path.GetExtension(fileName), StringComparer.InvariantCultureIgnoreCase);
        
    }
}