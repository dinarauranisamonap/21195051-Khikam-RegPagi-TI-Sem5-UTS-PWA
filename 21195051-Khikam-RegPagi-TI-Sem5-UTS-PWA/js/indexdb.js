// Membuka atau membuat database IndexedDB
    var db;
    var request = window.indexedDB.open("KomentarDatabase", 1);

    request.onerror = function(event) {
        console.error("Error opening database.");
    };

    request.onsuccess = function(event) {
        db = event.target.result;
        tampilkanKomentar();
    };

    request.onupgradeneeded = function(event) {
        db = event.target.result;
        var objectStore = db.createObjectStore("komentar", { keyPath: "id", autoIncrement: true });
        objectStore.createIndex("nama", "nama", { unique: false });
        objectStore.createIndex("email", "email", { unique: false });
        objectStore.createIndex("komentar", "komentar", { unique: false });
    };

    // Menambahkan komentar ke IndexedDB
    document.getElementById("komentar-form").addEventListener("submit", function(event) {
        event.preventDefault();
        var nama = document.getElementById("nama").value;
        var email = document.getElementById("email").value;
        var komentar = document.getElementById("komentar").value;

        var transaction = db.transaction(["komentar"], "readwrite");
        var objectStore = transaction.objectStore("komentar");
        var request = objectStore.add({ nama: nama, email: email, komentar: komentar });

        request.onsuccess = function(event) {
            tampilkanKomentar();
            document.getElementById("komentar-form").reset();
        };
    });

    // Menampilkan komentar dari IndexedDB
    function tampilkanKomentar() {
        var komentarList = document.getElementById("komentar-list");
        komentarList.innerHTML = "";

        var transaction = db.transaction(["komentar"], "readonly");
        var objectStore = transaction.objectStore("komentar");
        var request = objectStore.openCursor();

        request.onsuccess = function(event) {
            var cursor = event.target.result;
            if (cursor) {
                var li = document.createElement("li");
                li.textContent = "Nama: " + cursor.value.nama + ", Email: " + cursor.value.email + ", Komentar: " + cursor.value.komentar;
                komentarList.appendChild(li);
                cursor.continue();
            }
        };
    }