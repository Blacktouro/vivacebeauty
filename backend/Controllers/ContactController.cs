using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/contact")]
public class ContactController : ControllerBase
{
    [HttpPost]
    public IActionResult SendMessage([FromBody] ContactModel model)
    {
        Console.WriteLine($"Nome: {model.Name}");
        Console.WriteLine($"Mensagem: {model.Message}");

        return Ok(new { message = "Mensagem recebida!" });
    }
}

public class ContactModel
{
    public string Name { get; set; }
    public string Message { get; set; }
}