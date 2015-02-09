// SZYFROWANIE ZNAKÓW Z UŻYCIEM SZYFRU GRONSFELDA

// W szyfrowaniu Gronsfelda, stosuje się klucz liczbowy.
// Przykładowo, biorąc klucz o wartości 31206 i niezaszyfrowany tekst „PROGRAMOWANIE”, uzyskujemy następujący szyfrogram:
// 31206 31206 312 -> PROGR AMOWA NIE -> SSQGX DNQWG QJG
// Kolejne litery są przesuwane o kolejne wartości z klucza.

function encryption(a, b, c) { // szyfrowanie i odszyfrowywanie znaków metodą Gronsfelda
  "use strict";

  var data = a, // dane do zaszyfrowania / odszyfrowania
      key = b || 0, // klucz szyfrujacy
      mode = c, // tryb pracy programu: '0' - zaszyfruj dane; inna liczba - odszyfruj dane
      char1 = 0, // pojedyczny znak (reprezentacja znaku) danych przez zaszyfrowaniem / odszyfrowaniem
      char2 = 0, // pojedyczny znak (reprezentacja znaku) danych po zaszyfrowaniu / odszyfrowaniu
      result = '', // końcowy wynik szyfrowania / odszyfrowywania
      ascii = [" ", "!", '"', "#", "$", "%", "&", "'", "(", ")", "*", "+", ",", "-", ".", "/", "0", "1", "2", "3", "4", "5", "6",
  "7", "8", "9", ":", ";", "<", "=", ">", "?", "@", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P",
  "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "[", '\\', "]", "^", "_", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k",
  "l", "m", "n", "o", "p", "q", "r", "r", "s", "t", "u", "v", "w", "x", "y", "z", "{", "|", "}", "~" ]; // tablica 'widzialnych' znaków ASCII (bez znaków diakrytycznych!)

  key = key.toString(); // konwertuj klucz szyfrujacy na tekst
  data = data.toString(); // konwertuj dane do zaszyfrowania / odszyfrowania na tekst

  try {
    synchroData();
    cipherData();
  }
  catch(e) {
    alert("Wystąpił błąd programu: " + e.name)
  }

  function synchroData() { // dopasowanie długości (ilości znaków) klucza szyfrującego z długością (ilością danych) danych do zaszyfrowania

    if (data.length >= key.length) { // ciąg danych jest dłuższy niz ciąg szyfru (lub są równe)

      key = key.split(''); // przekonwertuj klucz szyfrujący na tablicę

      var k;
      for (k = 0, key.length; key.length < data.length; key.length + 1, k++) { // iteracja po 'pustych' (brakujących) elementach klucza szyfrującego
        key[key.length] = key[k]; // dopisz brakujące elementy klucza szyfrujacego, kopiując je z istniejących elementów
      }

      key = key.join(''); // przekonwertuj uzupełniony klucz szyfrujący na tekst
    }

    else { // ciąg danych jest krótszy niż ciąg szyfru ...
      key = key.slice(0, data.length); // ... więc utnij ciąg szyfru o zbędne elementy (w rzeczywistości nie jest to potrzebne, ale taki zapis zwiększa czytelność programu)
    }
  }

function cipherData() { // właściwe szyfrowanie / odszyfrowywanie danych

    for (var i = 0; i < data.length; i++) { // iteracja po znakach wyrażenia do zaszyfrowania / odszyfrowania
      for (var j = 0; j < ascii.length; j++) { // iteracja po elementach tablicy znaków ASCII
        if (data[i] == ascii[j]) { // znak 'i' z wyrażenia znajduje się w tablicy ASCII na pozycji (indeksie) 'j'

          char1 = j; // zapisz pozycję (indeks) 'j', na której występuje odnaleziony znak

          if (!mode) { // tryb szyfrowania danych
            char2 = Number(char1) + Number(key[i]); // do pozycji (indeksu) z tablicy znakow ASCII dodaj odpowiadającą jej wartość 'i' z klucza szyfrującego
          }
          else { // tryb odszyfrowywania danych
            char2 = Number(char1) - Number(key[i]); // od pozycji (indeksu) z tablicy znakow ASCCI odejmij odpowiadającą jej wartość 'i' z klucza szyfrującego
          }

          if (char2 >= ascii.length) { // po operacji dodawania (szyfrowanie danych), otrzymana pozycja (indeks) znajduje się poza tablicą ASCII ...
            char2 -= ascii.length; // ... więc "zawiń" ja na początek tablicy ASCII
          }

          if (char2 < 0) { // po operacji odejmowania (odszyfrowywanie danych), otrzymana pozycja (indeks) znajduje się poza tablicą ASCII ...
            char2 = ascii.length - Math.abs(char2); // ... więc "zawiń" ja na koniec tablicy ASCII
          }

          char2 = ascii[char2]; // zamień pozycję (indeks) z tablicy ASCII na odpowiadający jej znak alfanumeryczny
          break;
        } // koniec if

        else if (j == ascii.length - 1 && data[i] !== ascii[j]) { // po sprawdzeniu całej tablicy ASCII znak 'i' nie został odnaleziony
          alert('Ten program nie obsługuje znaku "' + data[i] + '". Operacja zakończona niepowodzeniem.');
          return; // zakończ działanie funkcji
        }
      } // koniec wewnętrznego for
    result += char2; // zapisz każdy zaszyfrowany / odszyfrowany znak
    } // koniec zewnętrznego for
  }
  return result; // wynik szyfrowania / odszyfrowywania 
};