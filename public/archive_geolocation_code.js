       /*
        // Browser-based Geolocation - commented out for IP-based approach
        geolocationButton.addEventListener("click", function () {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(showPosition, showError);
            } else {
                locationInfo.innerText = "Geolocation is not supported by this browser.";
                locationInfo.style.display = "block";
            }
        });

        function showPosition(position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            localStorage.setItem("latitude", latitude);
            localStorage.setItem("longitude", longitude);
            fetchCountryFromLatLong(latitude, longitude);
            geolocationButton.classList.add("clicked");
            locationAccepted = true;
            checkSelections();
        }
        function showError(error) {
            switch (error.code) {
                case error.PERMISSION_DENIED:
                    locationInfo.innerText = "User denied the request for Geolocation.";
                    break;
                case error.POSITION_UNAVAILABLE:
                    locationInfo.innerText = "Location information is unavailable.";
                    break;
                case error.TIMEOUT:
                    locationInfo.innerText = "The request to get user location timed out.";
                    break;
                case error.UNKNOWN_ERROR:
                    locationInfo.innerText = "An unknown error occurred.";
                    break;
            }
            locationInfo.style.display = "block";
        }
        */