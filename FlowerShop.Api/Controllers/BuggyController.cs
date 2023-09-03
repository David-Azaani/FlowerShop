using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace FlowerShop.Api.Controllers
{
    public class BuggyController : BaseApiController
    {
        public BuggyController(ILogger<BaseApiController> logger) : base(logger)
        {
        }

        [HttpGet("not-found")]
        public ActionResult GetNotFound() => NotFound();
        [HttpGet("bad-request")]
        public ActionResult GetBadRequest() => BadRequest(new ProblemDetails { Detail = "This is a Bad Reques", Title = "Bad-Request" });
        [HttpGet("un-authorized")]
        public ActionResult GetUnauthorized() => Unauthorized();
        [HttpGet("validation-error")]
        public ActionResult GetValidationError()
        {
            ModelState.AddModelError("Problem1", "This is the first error");
            ModelState.AddModelError("Problem2", "This is the second error");
            return ValidationProblem();

        }
        [HttpGet("server-error")]
        public ActionResult GetServerError()
        {

            throw new Exception("This is a server Error");

        }

    }
}