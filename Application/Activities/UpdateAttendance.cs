using Application.Core;
using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities
{
    public class UpdateAttendance
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _dataContext;
            private readonly IUserAccessor _userAccessor;
            public Handler(DataContext dataContext, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _dataContext = dataContext;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = await _dataContext.Activities.Include(x => x.ActivityAttendees)
                .ThenInclude(x => x.AppUser)
                .SingleOrDefaultAsync(x => x.Id == request.Id);

                if (activity == null)
                    return null;
                var user = await _dataContext.Users.SingleOrDefaultAsync(x => x.UserName == _userAccessor.GetUserName());
                if (user == null) return null;

                var hostUserName = activity.ActivityAttendees.FirstOrDefault(x => x.IsHost)?.AppUser.UserName;
                var attendance = activity.ActivityAttendees.FirstOrDefault(x => x.AppUser.UserName == user.UserName);
                if (attendance is not null && hostUserName == user.UserName)
                    activity.IsCancelled = !activity.IsCancelled;
                if (attendance is not null && hostUserName != user.UserName)
                    _dataContext.ActivityAttendees.Remove(attendance);

                if (attendance is null)
                {
                    attendance = new Domain.ActivityAttendee
                    {
                        Activity = activity,
                        AppUser = user,
                        IsHost = false
                    };
                    activity.ActivityAttendees.Add(attendance);
                }
                var Result = await _dataContext.SaveChangesAsync() > 0;
                return Result? Result<Unit>.Success(Unit.Value):Result<Unit>.Failure("Problem updating attendance");
            }

        }
    }
}