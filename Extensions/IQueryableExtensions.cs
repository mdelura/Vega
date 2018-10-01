using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using Vega.Core.Models;

namespace Vega.Extensions
{
    public static class IQueryableExtensions
    {
        public static IQueryable<T> ApplyOrdering<T>(this IQueryable<T> self, IQueryObject queryObj, Dictionary<string, Expression<Func<T, object>>> columnsMap)
        {
            if (string.IsNullOrWhiteSpace(queryObj.SortBy) || !columnsMap.ContainsKey(queryObj.SortBy))
                return self;
            return queryObj.IsSortAscending
                ? self.OrderBy(columnsMap[queryObj.SortBy])
                : self.OrderByDescending(columnsMap[queryObj.SortBy]);
        }

        public static IQueryable<T> ApplyPaging<T>(this IQueryable<T> query, IQueryObject queryObj) 
        {
            if (queryObj.Page <= 0)
                queryObj.Page = 1; 
            
            if (queryObj.PageSize <= 0)
                queryObj.PageSize = 10; 

            return query.Skip((queryObj.Page - 1) * queryObj.PageSize).Take(queryObj.PageSize);
        }

        public static IQueryable<Vehicle> ApplyFiltering(this IQueryable<Vehicle> query, VehicleQuery vehicleQuery)
        {
            if (vehicleQuery.MakeId.HasValue)
                query = query.Where(v => v.Model.MakeId == vehicleQuery.MakeId.Value);

            if (vehicleQuery.ModelId.HasValue)
                query = query.Where(v => v.Model.Id == vehicleQuery.ModelId.Value);

            return query;
        }
    }
}