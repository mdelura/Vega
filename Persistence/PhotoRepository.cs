using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Vega.Core;
using Vega.Core.Models;

namespace Vega.Persistence
{
    public class PhotoRepository : IPhotoRepository
    {
        private readonly VegaDbContext _context;

        public PhotoRepository(VegaDbContext context)
        {
            _context = context;
        }

        public void Add(Photo vehicle) => _context.Photos.Add(vehicle);
        public void Remove(Photo vehicle) => _context.Remove(vehicle);

        public async Task<IEnumerable<Photo>> GetPhotos(int vehicleId)
        {
            return await _context.Photos
            .Where(p => p.VehicleId == vehicleId)
            .ToListAsync();
        }
    }
}