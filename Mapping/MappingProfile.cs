using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using Vega.Controllers.Resources;
using Vega.Models;

namespace Vega.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            // Domain to API Resource
            CreateMap<Make, MakeResource>();
            CreateMap<Model, ModelResource>();
            CreateMap<Vehicle, VehicleResource>()
                .ForMember(vr => vr.Features, opt => opt.MapFrom(v => v.Features.Select(f => f.FeatureId)));

            // API Resource to Domain profile
            CreateMap<ContactResource, Contact>();
            CreateMap<VehicleResource, Vehicle>()
                .ForMember(v => v.Id, opt => opt.Ignore())
                .ForMember(v => v.Features, opt => opt.Ignore())
                .AfterMap((vr, v) => 
                {
                    //Remove unselected features
                    var removedFeatures = v.Features.Where(f => !vr.Features.Contains(f.FeatureId));
                    foreach (var f in removedFeatures)
                    {
                        v.Features.Remove(f);
                    }

                    // Add new features
                    var addedFeatures = vr.Features
                        .Where(id => !v.Features.Any(f => f.FeatureId == id))
                        .Select(id => new VehicleFeature() { FeatureId = id });
                    
                    foreach (var f in addedFeatures)
                    {
                        v.Features.Add(f);
                    }
                });
        }
    }
}