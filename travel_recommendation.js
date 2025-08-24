const input = document.querySelector(".search_input");
const searchContents = document.querySelector(".search_contents");

document.querySelector(".search").onclick = function () {
  if (input.value == "") {
    alert("Input required");
    return;
  }
  const searchInput = input.value.toLowerCase().trim();
  fetch("travel_recommendation_api.json")
    .then((res) => res.json())
    .then((data) => {
      searchContents.innerHTML = "";
      let keyword = undefined;
      if (searchInput == "country" || searchInput == "countries") {
        data["countries"].forEach((data) => {
          const { cities } = data;

          cities.forEach((data) => {
            searchContents.innerHTML += `<div class="content">
                <img
                  src=${data.imageUrl}
                  alt=""
                />
                <p class="name">${data.name}</p>
                <p class="description">
                 ${data.description}
                </p>
                <button>View</button>
              </div>`;
          });
        });
        return;
      } else if (searchInput == "temple") {
        keyword = data["temples"];
      } else if (searchInput == "beach") {
        keyword = data["beaches"];
      } else {
        keyword = data[searchInput];
      }
      // working good
      if (keyword == undefined) {
        // console.log(keyword);
        searchContents.innerHTML = `<div class="not_found">Keyword not found</div>`;
        return;
      } else {
        console.log(keyword);
        keyword.forEach((data) => {
          searchContents.innerHTML += `<div class="content">
              <img
                src=${data.imageUrl}
                alt=""
              />
              <p class="name">${data.name}</p>
              <p class="description">
               ${data.description}
              </p>
              <button>View</button>
            </div>`;
        });
      }
    })
    .catch((err) => console.log(err));
};
document.querySelector(".clear").onclick = function () {
  input.value = "";
};
