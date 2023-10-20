// Get the instance of the FileReader
const reader = new FileReader();
const image = document.getElementsByClassName('image-upload');
const imageAttribute = document.getElementsByClassName('image-attribute');
const fileUploader = document.getElementById('upload');
const btnDelete = document.getElementById('btn-delete');

//lấy các thẻ chứa input của người dùng
const nameProduct = document.getElementsByName('nameProduct')[0];
const productType = document.getElementsByName('productType')[0];
const brand = document.getElementsByName('brand')[0];
const price = document.getElementsByName('price')[0];
const quantity = document.getElementsByName('quantity')[0];
const color = document.getElementsByName('color')[0];
const size = document.getElementsByName('size')[0];
const description = document.getElementsByName('description')[0];
const imageInput = document.getElementsByName('image')[0];
const formProduct = document.getElementsByClassName('form-product')[0];
//object chứa input người dùng
const valueInput = new Object();
//lấy nút lưu sản phẩm và hủy thêm sản phẩm
const btnSaveProduct = document.getElementById('btn-save-product');
const btnCancel = document.getElementById('btn-cancel');

fileUploader.addEventListener('change', async (event) => {
  let file = event.target.files[0];
  let img = document.createElement('img');
  let imageName = document.createElement('p');
  let imageSize = document.createElement('span');
  const bin = document.createElement('img');

  // Get the file object after upload and read the
  // data as URL binary string

  // Once loaded, do something with the string
  reader.addEventListener('load', async (event) => {
    valueInput.image = event.target.result;
    if (file.name !== 'test') {
      event.preventDefault();
      // hiển thị ảnh tải lên
      image[0].appendChild(img);
      img.src = event.target.result;
      img.alt = file.name;
      // hiển thị tên và kích thước file
      imageName.textContent = file.name;
      imageSize.textContent = Math.round((file.size / 1024) * 100) / 100 + 'KB';
      imageAttribute[0].appendChild(imageName);
      imageAttribute[0].appendChild(imageSize);

      // hiển thị nút xóa
      btnDelete.appendChild(bin);
      bin.src = '../img/svg/trash-2.svg';
      bin.className = 'svg';
    }
  });
  btnDelete.onclick = async () => {
    let Arr = new Array(2);
    valueInput.image = undefined;
    image[0].removeChild(img);
    imageAttribute[0].removeChild(imageName);
    imageAttribute[0].removeChild(imageSize);
    btnDelete.removeChild(bin);
    file = new File(Arr, 'test');
  };
  if (file.name !== 'test') {
    reader.readAsDataURL(file);
  }
});

//lấy giá trị từ ô input
nameProduct.onchange = function () {
  valueInput.nameProduct = nameProduct.value;
};
productType.onchange = function () {
  valueInput.productType = productType.value;
};
brand.onchange = function () {
  valueInput.brand = brand.value;
};
price.onchange = function () {
  valueInput.price = price.value;
};
quantity.onchange = function () {
  valueInput.quantity = quantity.value;
};
color.onchange = function () {
  valueInput.color = color.value;
};
size.onchange = function () {
  valueInput.size = size.value;
};
description.onchange = function () {
  valueInput.description = description.value;
};

//tạo biến kiểm tra số lượng field người dùng nhập
var check = 0;

btnSaveProduct.onclick = () => {
  check = 0;
  for (var key in valueInput) {
    if (valueInput[key]) check++;
  }
  if (check === 9) {
    //tạo đối tượng XMLHttpRequest
    const xhr = new XMLHttpRequest();
    // Tạo hàm xử lý sự kiện khi nhận được phản hồi từ server
    xhr.onreadystatechange = function () {
      if (xhr.status === 413) {
        alert('Request entity too large');
      }
      if (xhr.readyState === 4) {
        // Xử lý kết quả trả về từ server
        alert(xhr.responseText);
      }
    };
    xhr.open('POST', 'http://localhost:4000/product/add-product', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    var json = JSON.stringify(valueInput);
    xhr.send(json);
  } else {
    alert('Bạn cần nhập đầy đủ thông tin trước khi thêm!');
  }
};
btnCancel.onclick = () => {
  nameProduct.value = '';
  productType.value = '';
  brand.value = '';
  price.value = '';
  quantity.value = '';
  color.value = '';
  size.value = '';
  description.value = '';
  btnDelete.click();
};
