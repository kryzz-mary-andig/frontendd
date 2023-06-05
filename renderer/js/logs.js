// Read Prompts from SupaBase
getPrompts();
async function getPrompts() {
  const tbody = document.getElementById('tbl_prompts');
  tbody.innerHTML = '<tr><th scope="row" colspan="6"><div class="spinner"></div> Loading...</th></tr>';

  try {
    const response = await window.axios.supaBase('get');
    let htmlResult = '';
    Object.keys(response).forEach((key) => {
      let date = new Date(response[key].created_at.replace(' ', 'T'));

      htmlResult += `<tr>
          <th scope="row">${response[key].prompt_id}</th>
          <td>${response[key].movie_title}</td>
          <td>${response[key].emoji_response}</td>
          <td>${date.toLocaleString('en-US', { timeZone: 'UTC' })}</td>
          <td>
            <div class="btn-group" role="group">
              <button type="button" class="btn btn-primary btn-sm dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                Action
              </button>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item btn_prompts_del" href="#" data-id="${response[key].prompt_id}">Remove</a></li>
              </ul>
            </div>
          </td>
        </tr>`;
    });

    tbody.innerHTML = htmlResult;
  } catch (error) {
    console.error(error);
    tbody.innerHTML = '<tr><th scope="row" colspan="6">Failed to load logs</th></tr>';
  }
}

// Set Btn Delete Prompt Click functionality from Table Prompts
const tbl_prompts = document.getElementById('tbl_prompts');
if (tbl_prompts) {
  tbl_prompts.onclick = async function (e) {
    if (e.target && e.target.classList.contains('btn_prompts_del')) {
      const id = e.target.getAttribute('data-id');
      try {
        const response = await window.axios.supaBase('delete', id);
        console.log(response);

        alertMessage('success', `Successfully deleted id ${id}!`);
        getPrompts();
      } catch (error) {
        console.error(error);
        alertMessage('error', `Failed to delete id ${id}`);
      }
    }
  };
}
