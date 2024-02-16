using System;
using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : IdentityDbContext<AppUser>
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Activity> Activities { get; set; }
        public DbSet<ActivityAttendee> ActivityAttendees { get; set; }
        public DbSet<Comment> Comments { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<ActivityAttendee>(x => x.HasKey(aa => new { aa.AppUserId, aa.ActivityId }));

            builder.Entity<ActivityAttendee>()
            .HasOne(u => u.AppUser)
                .WithMany(x => x.Activities)
                .HasForeignKey(x => x.AppUserId);

            builder.Entity<ActivityAttendee>()
             .HasOne(u => u.Activity)
             .WithMany(x => x.ActivityAttendees)
             .HasForeignKey(x => x.ActivityId);
        
        builder.Entity<Comment>()
        .HasOne(x=>x.Activity)
        .WithMany(x=>x.Comments)
        .OnDelete(DeleteBehavior.Cascade);
        
        }

        
    }
}