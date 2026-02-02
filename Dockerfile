# Use official MongoDB image
FROM mongo:7

# Expose MongoDB default port
EXPOSE 27017

# Start MongoDB and allow external connections
CMD ["mongod", "--bind_ip_all"]