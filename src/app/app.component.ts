import { Component, ElementRef, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { AddressService } from './address.service';

declare const google: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  profile = {
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    addressLine1: '',
    addressLine2: '',
    suburb: '',
    state: '',
    postcode: ''
  };
  addresses: any[] = [];
  showManualAddress = false;
  map: any;
  marker: any;

  @ViewChild('mapContainer', { static: true }) mapContainer!: ElementRef;

  constructor(private addressService: AddressService) {}

  ngOnInit() {
    this.loadAddresses();
  }

  ngAfterViewInit() {
    // Initialize the map once the view is fully initialized
    this.initMap();
  }

  loadAddresses() {
    this.addressService.getAddresses().subscribe(
      (data) => {
        this.addresses = data;
        if (this.addresses.length > 0) {
          this.showAddressOnMap(this.addresses[this.addresses.length - 1].address);
        }
      },
      (error) => {
        console.error('Failed to fetch addresses:', error);
      }
    );
  }

  initMap() {
    // Default location to center the map
    const defaultLocation = { lat: -33.8688, lng: 151.2093 };
    
    this.map = new google.maps.Map(this.mapContainer.nativeElement, {
      center: defaultLocation,
      zoom: 15,
    });

    this.marker = new google.maps.Marker({
      position: defaultLocation,
      map: this.map,
      title: 'Default Location',
    });
  }

  onAddressSelected(addressComponents: any) {
    this.profile.address = addressComponents.fullAddress;
    this.profile.addressLine1 = `${addressComponents.streetNumber || ''} ${addressComponents.street || ''}`.trim();
    this.profile.suburb = addressComponents.suburb || '';
    this.profile.state = addressComponents.state || '';
    this.profile.postcode = addressComponents.postcode || '';
    this.showAddressOnMap(this.profile.address); // Update map as soon as address is selected
  }

  onAddressChange(event: any) {
    const address = event.target.value;
    this.showAddressOnMap(address); // Update map in real-time as user types in address
  }

  onSubmit() {
    this.addressService.saveAddress(this.profile).subscribe(
      (response) => {
        console.log('Profile saved:', response);
        
        // Refresh the list of addresses
        this.loadAddresses();
  
        // Show the new address on the map
        this.showAddressOnMap(this.profile.address);
  
        // Clear the form after submission
        this.clearForm();
      },
      (error) => {
        console.error('Error saving profile:', error);
      }
    );
  }

  clearForm() {
    this.profile = {
      firstName: '',
      lastName: '',
      phone: '',
      address: '',
      addressLine1: '',
      addressLine2: '',
      suburb: '',
      state: '',
      postcode: ''
    };
  }

  toggleManualEntry(event: Event) {
    event.preventDefault();
    this.showManualAddress = !this.showManualAddress;
  }

  showAddressOnMap(address: string) {
    const geocoder = new google.maps.Geocoder();

    geocoder.geocode({ address: address }, (results: any, status: any) => {
      if (status === google.maps.GeocoderStatus.OK) {
        const location = results[0].geometry.location;
        console.log('Geocoding successful. Location:', location.toString());

        if (this.map) {
          this.map.setCenter(location);
          if (this.marker) {
            this.marker.setPosition(location);
          } else {
            this.marker = new google.maps.Marker({
              position: location,
              map: this.map,
              title: 'Address Location'
            });
          }
        }
      } else {
        console.error('Geocode was not successful for the following reason:', status);
      }
    });
  }
}
