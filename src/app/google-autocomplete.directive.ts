import { Directive, ElementRef, EventEmitter, Output, OnInit } from '@angular/core';

declare const google: any;

@Directive({
  selector: '[appGoogleAutocomplete]'
})
export class GoogleAutocompleteDirective implements OnInit {
  @Output() addressSelected = new EventEmitter<any>();

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    const autocomplete = new google.maps.places.Autocomplete(this.el.nativeElement, {
      types: ['geocode']
    });

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      if (place && place.address_components) {
        this.addressSelected.emit(this.getAddressComponents(place));
      }
    });
  }

  private getAddressComponents(place: any) {
    const components: any = {};
    place.address_components.forEach((component: any) => {
      const types = component.types;
      if (types.includes('street_number')) {
        components.streetNumber = component.long_name;
      }
      if (types.includes('route')) {
        components.street = component.long_name;
      }
      if (types.includes('locality')) {
        components.suburb = component.long_name;
      }
      if (types.includes('administrative_area_level_1')) {
        components.state = component.short_name;
      }
      if (types.includes('postal_code')) {
        components.postcode = component.long_name;
      }
    });
    components.fullAddress = place.formatted_address;
    return components;
  }
}
