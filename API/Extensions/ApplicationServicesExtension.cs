using Application.Activities;
using Application.Core;
using Application.Interfaces;
using FluentValidation;
using FluentValidation.AspNetCore;
using Infrastructure.Security;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Extensions;

public static class ApplicationServicesExtension
{
    public static IServiceCollection AddApplicationServices(this IServiceCollection Services
    , IConfiguration config)
    {


        // Add services to the container.

        Services.AddControllers(opt =>
        {
            var policy = new AuthorizationPolicyBuilder().RequireAuthenticatedUser().Build();
            opt.Filters.Add(new AuthorizeFilter(policy));
        });
        // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
        Services.AddEndpointsApiExplorer();
        Services.AddSwaggerGen();
        Services.AddDbContext<DataContext>(opt =>
        {
            opt.UseSqlite(config.GetConnectionString("Default"));
        });

        Services.AddCors(opt =>
        {
            opt.AddPolicy("CorsPolicy", policy =>
            {
                policy
                .AllowAnyMethod()
                .AllowAnyHeader()
                .AllowCredentials()
                .WithOrigins("http://localhost:3000");
            });
        });
        Services.AddAutoMapper(typeof(MappingProfiles).Assembly);
        Services.AddMediatR(typeof(List.Handler));
        Services.AddFluentValidationAutoValidation();
        Services.AddValidatorsFromAssemblyContaining<Create>();
        Services.AddHttpContextAccessor();
        Services.AddScoped<IUserAccessor, UserAccessor>();
        Services.AddSignalR();
        return Services;
    }
}
