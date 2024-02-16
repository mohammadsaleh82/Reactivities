using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Infrastructure.Security
{
    public class IsHostRequirment:IAuthorizationRequirement
    {
        
    }

    public class IsHostRequirmentHandler : AuthorizationHandler<IsHostRequirment>
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly DataContext _dataContext;
        public IsHostRequirmentHandler(DataContext dataContext ,IHttpContextAccessor httpContextAccessor)
        {
            _dataContext = dataContext;
            _httpContextAccessor = httpContextAccessor;
        }

        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, IsHostRequirment requirement)
        {
           var userId=context.User.FindFirstValue(ClaimTypes.NameIdentifier);
           if(userId is null) return Task.CompletedTask;

           var activityId=Guid.Parse(_httpContextAccessor.HttpContext?.Request.RouteValues.FirstOrDefault(x=>x.Key=="id").Value?.ToString());

           var attendee=_dataContext.ActivityAttendees
           .AsNoTracking()
           .SingleOrDefaultAsync(x=>x.AppUserId==userId && x.ActivityId==activityId).Result;
           if(attendee is null)return Task.CompletedTask;

           if(attendee.IsHost) context.Succeed(requirement);
           return Task.CompletedTask;
        }
    }

    
    
}