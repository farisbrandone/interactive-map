export async function compressImage(files, maxWidth, maxHeight, quality) {
  const tabImages = [];
  const tabNames = [];

  for (let i = 0; i < files.length; i++) {
    let urlImage;
    const name = files[i].name;

    const data = await (function (file, name) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = (event) => {
          const img = new Image();

          img.src = event.target?.result;
          img.onload = () => {
            let width = img.width;
            let height = img.height;

            if (width > height) {
              if (width > maxWidth) {
                height *= maxWidth / width;
                width = maxWidth;
              }
            } else {
              if (height > maxHeight) {
                width *= maxHeight / height;
                height = maxHeight;
              }
            }

            const canvas = document.createElement("canvas");
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext("2d");
            ctx?.drawImage(img, 0, 0, width, height);
            urlImage = canvas.toDataURL("image/jpeg", quality);

            resolve([urlImage, name]);
          };
        };
        reader.onerror = (error) => {
          reject(error);
        };
      });
    })(files[i], name);
    tabImages[i] = data[0];
    tabNames[i] = data[1];
  }

  return { photo: tabImages[0], publication: true };
}

export async function compressImage2(files, maxWidth, maxHeight, quality) {
  const tabImages = [];
  const tabNames = [];

  for (let i = 0; i < files.length; i++) {
    let urlImage;
    const name = files[i].name;

    const data = await (function (file, name) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = (event) => {
          const img = new Image();

          img.src = event.target?.result;
          img.onload = () => {
            let width = img.width;
            let height = img.height;

            if (width > height) {
              if (width > maxWidth) {
                height *= maxWidth / width;
                width = maxWidth;
              }
            } else {
              if (height > maxHeight) {
                width *= maxHeight / height;
                height = maxHeight;
              }
            }

            const canvas = document.createElement("canvas");
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext("2d");
            ctx?.drawImage(img, 0, 0, width, height);
            urlImage = canvas.toDataURL("image/jpeg", quality);

            resolve([urlImage, name]);
          };
        };
        reader.onerror = (error) => {
          reject(error);
        };
      });
    })(files[i], name);
    tabImages[i] = data[0];
    tabNames[i] = data[1];
  }

  return { photo: tabImages[0], publication: false };
}
