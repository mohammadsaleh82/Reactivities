using Domain;
using Microsoft.AspNetCore.Mvc;
using MediatR;
using Application.Activities;
using Microsoft.AspNetCore.Authorization;

namespace API.Controllers;

public class ActivityController : BaseConroller
{

     [HttpGet] //api/activities
     public async Task<ActionResult<List<Activity>>> GetActivities() =>
          HandleResult(await Mediator.Send(new List.Query()));

     [HttpGet("{id}")]
     public async Task<ActionResult<Activity>> GetActivity(Guid id) =>
         HandleResult(await Mediator.Send(new Details.Query { Id = id }));

     [HttpPost]
     public async Task<ActionResult<Activity>> CreateActivity(Activity activity) =>
          HandleResult(await Mediator.Send(new Create.Command { activity = activity }));

     [HttpPost("{id}/attend")]
     public async Task<ActionResult> UpdateAttendance(Guid id) =>
               HandleResult(await Mediator.Send(new UpdateAttendance.Command { Id = id }));
     [Authorize(Policy="IsHostRequirment")]
     [HttpPut("{id}")]
     public async Task<ActionResult<Activity>> EditActivity(Guid Id, Activity activity)
     {
          activity.Id = Id;
          return HandleResult(await Mediator.Send(new Edit.Commend { activity = activity }));
     }
     [Authorize(Policy="IsHostRequirment")]
     [HttpDelete("{id}")]
     public async Task<ActionResult> DeleteActivity(Guid id) =>
         HandleResult(await Mediator.Send(new Delete.Command { Id = id }));


}
