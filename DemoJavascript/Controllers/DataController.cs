using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace DemoJavascript.Controllers
{
    public class DataController : ApiController
    {
        static Dictionary<string, DataEntity> memoryStore = new Dictionary<string, DataEntity>();

        public Task<IHttpActionResult> Get(string id)
        {
            if (memoryStore.ContainsKey(id))
                return Task.FromResult<IHttpActionResult>(Json(memoryStore[id]));

            return Task.FromResult<IHttpActionResult>(ResponseMessage(Request.CreateResponse(HttpStatusCode.NotFound)));
        }
        public Task<IHttpActionResult> GetCollection()
        {
            if (memoryStore == null || memoryStore.Values.Count() == 0)
            {
                return Task.FromResult<IHttpActionResult>(NotFound());
            }
            return Task.FromResult<IHttpActionResult>(Json(memoryStore.Values.ToList()));
        }
        public Task<IHttpActionResult> Post(DataEntity entity)
        {
            if (ModelState.IsValid)
            {
                if (!memoryStore.ContainsKey(entity.Id))
                {
                    memoryStore.Add(entity.Id, entity);
                }
            }

            return Task.FromResult<IHttpActionResult>(Json(entity));
        }
    }

    public class DataEntity
    {
        public string Id { get; set; }
        public string Name { get; set; }
    }
}
