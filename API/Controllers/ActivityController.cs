using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers;

public class ActivityController : BaseConroller
{
    private readonly DataContext _context;
    public ActivityController(DataContext context)
    {
        _context = context;

    }


    [HttpGet] //api/activities
    public async Task<ActionResult<List<Activity>>> GetActivities() =>
         await _context.Activities.ToListAsync();


    [HttpGet("{id}")]
    public async Task<ActionResult<Activity>> GetActivity(Guid id) =>
             await _context.Activities.FindAsync(id);

             
}
