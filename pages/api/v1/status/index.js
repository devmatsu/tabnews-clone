function status(request, response) {
  response.status(200).json({ message: "The API is working" });
}

export default status;
