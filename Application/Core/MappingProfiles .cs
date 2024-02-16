using Application.Activities;
using Application.Comments;
using AutoMapper;
using Domain;

namespace Application.Core;

public class MappingProfiles : Profile
{
    public MappingProfiles()
    {
        CreateMap<Activity, Activity>();
        CreateMap<Activity, ActivityDto>()
            .ForMember(x => x.HostUserName,
            o => o.MapFrom(s => s.ActivityAttendees.FirstOrDefault(x => x.IsHost).AppUser.UserName));
        CreateMap<ActivityAttendee, Profiles.Profile>()
        .ForMember(i => i.UserName, o => o.MapFrom(u => u.AppUser.UserName))
        .ForMember(i => i.DisplayName, o => o.MapFrom(u => u.AppUser.DisplayName))
        .ForMember(i => i.Bio, o => o.MapFrom(u => u.AppUser.Bio));

        CreateMap<Comment,CommentDto>()
        .ForMember(x=>x.Username,o=>o.MapFrom(x=>x.Author.UserName))
        .ForMember(x=>x.DisplayName,o=>o.MapFrom(x=>x.Author.DisplayName));
    }
}
