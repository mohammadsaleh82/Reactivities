using System.Net;
using System.Text.Json;
using Application.Core;

namespace API.MiddleWare;
public class ExceptionMiddleWare
{
    private readonly RequestDelegate _next;
    private readonly ILogger<ExceptionMiddleWare> _logger;
    private readonly IHostEnvironment _env;

    public ExceptionMiddleWare(RequestDelegate next, ILogger<ExceptionMiddleWare> logger
  , IHostEnvironment env)
    {
        _next = next;
        _logger = logger;
        _env = env;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, ex.Message);
            context.Response.ContentType = "application/json";
            context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
            var Response = _env.IsDevelopment() ?
             new AppException(context.Response.StatusCode, ex.Message, ex.StackTrace?.ToString()) :
             new AppException(context.Response.StatusCode, "Internal Server Error");
            var options=new JsonSerializerOptions{PropertyNamingPolicy=JsonNamingPolicy.CamelCase};

            var json=JsonSerializer.Serialize(Response,options);
            await context.Response.WriteAsync(json);
            
        }
    }
}
