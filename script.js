document.addEventListener('DOMContentLoaded', function() {
    // Payment method selection
    const paymentMethods = document.querySelectorAll('.payment-method');
    
    paymentMethods.forEach(method => {
        method.addEventListener('click', function() {
            paymentMethods.forEach(m => m.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Form validation
    const form = document.getElementById('passengerForm');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate primary passenger info
        const firstName = document.getElementById('firstName');
        const lastName = document.getElementById('lastName');
        const gender = document.getElementById('gender');
        const dob = document.getElementById('dob');
        const email = document.getElementById('email');
        const phone = document.getElementById('phone');
        
        if (!firstName.value) {
            showError(firstName, 'First name is required');
            return;
        }
        
        if (!lastName.value) {
            showError(lastName, 'Last name is required');
            return;
        }
        
        if (!gender.value) {
            showError(gender, 'Please select gender');
            return;
        }
        
        if (!dob.value) {
            showError(dob, 'Date of birth is required');
            return;
        }
        
        if (!email.value) {
            showError(email, 'Email is required');
            return;
        } else if (!validateEmail(email.value)) {
            showError(email, 'Please enter a valid email');
            return;
        }
        
        if (!phone.value) {
            showError(phone, 'Phone number is required');
            return;
        }
        
        // Validate payment info if credit card is selected
        const activePayment = document.querySelector('.payment-method.active');
        
        if (activePayment && activePayment.textContent.includes('Credit Card')) {
            const cardNumber = document.getElementById('cardNumber');
            const cardName = document.getElementById('cardName');
            const expiryDate = document.getElementById('expiryDate');
            const cvv = document.getElementById('cvv');
            
            if (!cardNumber.value) {
                showError(cardNumber, 'Card number is required');
                return;
            }
            
            if (!cardName.value) {
                showError(cardName, 'Name on card is required');
                return;
            }
            
            if (!expiryDate.value) {
                showError(expiryDate, 'Expiry date is required');
                return;
            }
            
            if (!cvv.value) {
                showError(cvv, 'CVV is required');
                return;
            }
        }
        
        // If all validations pass, proceed to payment
        alert('Booking submitted successfully!');
        // In a real app, you would redirect to payment page or process payment here
    });
    
    function showError(input, message) {
        const formGroup = input.parentElement;
        const error = document.createElement('small');
        error.className = 'error-message';
        error.style.color = 'red';
        error.textContent = message;
        
        // Remove existing error if any
        const existingError = formGroup.querySelector('.error-message');
        if (existingError) {
            formGroup.removeChild(existingError);
        }
        
        formGroup.appendChild(error);
        input.focus();
    }
    
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // Format card number input
    const cardNumber = document.getElementById('cardNumber');
    
    cardNumber.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\s+/g, '');
        if (value.length > 0) {
            value = value.match(new RegExp('.{1,4}', 'g')).join(' ');
        }
        e.target.value = value;
    });
    
    // Format expiry date input
    const expiryDate = document.getElementById('expiryDate');
    
    expiryDate.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 2) {
            value = value.substring(0, 2) + '/' + value.substring(2, 4);
        }
        e.target.value = value;
    });
    
    // Back button functionality
    const backBtn = document.querySelector('.back-btn');
    
    backBtn.addEventListener('click', function() {
        // In a real app, this would go back to the previous step or page
        window.location.href = 'index.html';
    });
    
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const authButtons = document.querySelector('.auth-buttons');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            authButtons.classList.toggle('active');
        });
    }
});
