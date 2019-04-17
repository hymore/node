$(function() {
    getData()
    deleteHero()

    function getData() {
        $.ajax({
            url: "./list",
            dataType: "json",
            success: data => {
                // console.log(data);
                let html = ""
                for (let i = 0; i < data.length; i++) {
                    html += `<tr>
                                <td>${data[i].Id}</td>
                                <td>${data[i].heroName}</td>
                                <td>
                                  <img
                                    src="${data[i].heroIcon}"
                                    alt=""
                                  />
                                </td>
                                <td>
                                  <a class="check"  href="./detail.html?id=${
                                      data[i].Id
                                  }">查看</a>
                                  <a class="delete" data-id='${
                                      data[i].Id
                                  }' href="#">删除</a>
                                </td>
                              </tr>`
                }
                $("tbody").html(html)
            }
        })
    }

    function deleteHero() {
        $("tbody").on("click", "a.delete", function(){
            const id = $(this).data("id")
            // console.log(id);

            $.ajax({
                url: "/deletehero",
                data: { id },
                dataType: "json",
                success: data => {
                    if (data.code == 200) {
                        getData()
                    }
                }
            })
        })
    }
})
