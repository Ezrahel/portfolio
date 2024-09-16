document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contact-form');
  
    form.addEventListener('submit', async (event) => {
      event.preventDefault(); // Prevent the default form submission
  
      // Get the form data
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const mobile = document.getElementById('mobile').value;
      const location = document.getElementById('location').value;
      const time = document.getElementById('time').value;
      const date = document.getElementById('date').value;
      const timeZone = document.getElementById('timeZone').value;
      const message = document.getElementById('message').value;
  
      // Prepare the data to send in the POST request
      const formData = {
        name: name,
        email: email,
        mobile: mobile,
        location: location,
        time: time,
        date: date,
        timeZone: timeZone,
        message: message
      };
  
      try {
        // Send the POST request to the server
        const response = await fetch('http://localhost:3000/send_email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });
  
        // Handle the response from the server
        if (response.ok) {
          alert('Message sent successfully!');
          form.reset(); // Reset the form fields
        } else {
          const errorMessage = await response.text();
          alert(`Error: ${errorMessage}`);
        }
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while sending the message.');
      }
    });
  });
  