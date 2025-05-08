# Base image
FROM nginx:alpine

# Copy build hasil React ke direktori default NGINX
COPY build/ /usr/share/nginx/html

# Expose port
EXPOSE 8080

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]