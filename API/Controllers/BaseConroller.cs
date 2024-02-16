using Application.Core;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BaseConroller : ControllerBase
{
    private IMediator _mediator;

    protected Mediator Mediator => (Mediator)(_mediator ??=
       HttpContext.RequestServices.GetService<IMediator>());

    public ActionResult HandleResult<T>(Result<T> result)
    {
        if(result==null) return NotFound();
        if (result.IsSuccess && result.Value != null)
            return Ok(result.Value);

        if (result.IsSuccess && result.Value == null)
            return NotFound();

        return BadRequest(result.errors);
    }
}
