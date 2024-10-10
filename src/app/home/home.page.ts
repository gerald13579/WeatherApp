import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

const API_URL = environment.API_URL;
const API_KEY = environment.API_KEY;

interface WeatherData {
  main: {
    temp: number;
    temp_max: number;
    temp_min: number;
    humidity: number;
  };
  name: string;
  weather: {
    description: string; // Menyertakan deskripsi cuaca
    icon: string;
  }[];
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  weatherData: WeatherData | undefined; // Menyimpan data cuaca
  todayDate: Date = new Date();
  cityName: string = "Manado"; // Inisialisasi dengan kota default
  weatherIcon: string | undefined;

  constructor(public httpClient: HttpClient) {
    this.loadData(); // Memuat data cuaca untuk kota default saat aplikasi dimulai
  }

  loadData() {
    this.httpClient
      .get<WeatherData>(`${API_URL}/weather?q=${this.cityName}&appid=${API_KEY}`)
      .subscribe((result) => {
        console.log(result);
        this.weatherData = result; // Simpan seluruh objek WeatherData
        this.weatherIcon = `http://openweathermap.org/img/wn/${result.weather[0].icon}@2x.png`; // Ambil ikon cuaca
        console.log(this.weatherData);
      });
  }

  searchCity() {
    this.loadData(); // Memuat data cuaca untuk kota yang dicari
  }
}
