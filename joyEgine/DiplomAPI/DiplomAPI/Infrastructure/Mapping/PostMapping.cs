using AutoMapper;
using JoyBusinessService.Models.PostsModels;
using Model;

namespace DiplomAPI.Infrastructure.Mapping
{
    public class PostMapping : Profile
    {
        protected override void Configure()
        {
            Mapper.CreateMap<PostModel, Post>()
                .ForMember(dest => dest.Tittle, opt => opt.MapFrom(src => src.Header))
                .ForMember(dest => dest.ContentText, opt => opt.MapFrom(src => src.Message));
        }
    }
}