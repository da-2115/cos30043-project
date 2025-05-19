<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-6 col-md-6 col-sm-12">
        <h2 id="aboutHeading">About</h2>
        <p id="aboutParagraph">
          My web application contains a few different parts including a blog posting app for Computer Science and/or programming related blog posts, aswell
          as a forum for similiar items where people can ask questions and last but not least, chat functionality to network with peers with encrypted messaging.
        </p>
        <div>
          <p>{{ firstName != "" || lastName != "" ? `Welcome ${firstName} ${lastName}!` : "" }}</p>
        </div>
      <form id="aboutForm">
        <div>
          <label for="firstName">First Name:<input name="firstName" class="form-control" type="input" v-model="firstName"> </label>
          <br />
          <label for="lastName">Last Name: <input name="lastName" class="form-control" type="input" v-model="lastName"></label>
        </div>
        <div>
          <label for="radioGroup">Image 1: <input name="radioGroup" type="radio"></label>
          <br />
          <label for="radioGroup">Image 2: <input name="radioGroup" type="radio"></label>
        </div>
      </form>
    </div>
  </div>
  </div>
</template>
  
  <script>
  
  export default {
    name: 'About',
    data() {
      return {
        firstName: "",
        lastName: ""
      }
    }
  } 
  
  </script>
  
  <style>
  
  </style>