// diğer js dosylarından gelenler
import Github from './api.js';
import UI from './ui.js';

// github ve UI class'ının bir öreneğini oluşturma
const github = new Github();
const ui = new UI();

//! html'den gelenler
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-btn');
const themeBtn = document.getElementById('theme-btn');
const body = document.querySelector('body');

//! olay izleyicleri
searchButton.addEventListener('click', getInput);

searchInput.addEventListener('keypress', (e) => {
  if (e.code === 'Enter') {
    getInput();
  }
});

themeBtn.addEventListener('click', changeTheme);

//! methodlar
function getInput() {
  //* arama terimi boş değilse
  if (searchInput.value !== '') {
    // kullancı bilgileri ve repol'ları için api isteği at
    github.getUser(searchInput.value).then((data) => {
      // eğer kullanıcı bulunamadıysa
      if (data.profile.message === 'Not Found') {
        ui.showAlert(
          'Aradığınız Kullanıcı Bulunamadı',
          'alert-danger'
        );
      } else {
        ui.showAlert('Kullanıcı Başarıyla Bulundu', 'alert-success');
        // kullanıcı detay alanını ekrana bas
        ui.showProfile(data.profile);

        // repoları ekrana bas
        ui.showRepos(data.repos);
      }
    });

    return;
  }

  //* arama terimi boş ise
  ui.showAlert('Form alanı boş olamaz', 'alert-info');
}

function changeTheme() {
  // arkplanı değiştirme
  body.classList.toggle('bg-dark');
  body.classList.toggle('text-bg-dark');

  //   butonun yazını değiştirme
  if (body.classList.contains('bg-dark')) {
    themeBtn.innerText = 'Açık Mod';
  } else {
    themeBtn.innerText = 'Koyu Mod';
  }
}