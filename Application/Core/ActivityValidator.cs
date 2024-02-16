using Domain;
using FluentValidation;

namespace Application.Core;

public class ActivityValidator : AbstractValidator<Activity>
{
    public ActivityValidator()
    {
        RuleFor(x => x.Title).NotEmpty();
        RuleFor(x => x.Venue).NotEmpty();
        RuleFor(x => x.City).NotEmpty();
        RuleFor(x => x.Description).NotEmpty();
        RuleFor(x => x.Id).NotEmpty();  
    }
}
