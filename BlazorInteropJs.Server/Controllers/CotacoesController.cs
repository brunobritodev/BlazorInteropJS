using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using BlazorInteropJs.Shared;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace BlazorInteropJs.Server.Controllers
{
    public class CotacaoController : Controller
    {
        [Route("api/cotacao")]
        public async Task<IActionResult> Index()
        {
            var client = new HttpClient();
            var conteudo = await client.GetStringAsync("https://api.coinmarketcap.com/v2/ticker/");

            var moedas  = JsonConvert.DeserializeObject<ListaMoedas>(conteudo).data.Select(s => new MoedaViewModel()
            {
                Id = s.Value.id,
                Nome = s.Value.name,
                Simbolo = s.Value.symbol,
                Rank = s.Value.rank,
                Preco = s.Value.quotes["USD"].price,
            }).ToList();
            return Ok(moedas);
        }


    }

    
}