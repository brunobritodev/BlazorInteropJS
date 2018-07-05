using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;
using BlazorInteropJs.Shared;
using Microsoft.AspNetCore.Blazor;
using Microsoft.AspNetCore.Blazor.Browser.Interop;
using Microsoft.AspNetCore.Blazor.Components;

namespace BlazorInteropJs.Client.Pages
{
    public class MoedasModel : BlazorComponent
    {
        [Inject]
        protected HttpClient Http { get; set; }

        protected List<MoedaViewModel> Moedas;

        protected override async Task OnInitAsync()
        {
            Moedas = await Http.GetJsonAsync<List<MoedaViewModel>>($"/api/cotacao");
        }

        protected void CallJSMethod()
        {
            RegisteredFunction.Invoke<bool>("GerarPDF");
        }
    }
}