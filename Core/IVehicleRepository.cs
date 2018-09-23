using System.Collections.Generic;
using System.Threading.Tasks;
using Vega.Core.Models;

namespace Vega.Core
{
    public interface IVehicleRepository : IRepository<Vehicle>
    {
        Task<Vehicle> GetVehicle(int id, bool includeRelated = true);
        Task<QueryResult<Vehicle>> GetVehicles(VehicleQuery filter);
    }
}