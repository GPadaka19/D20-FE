# Base image
FROM nginx:alpine

# Copy build hasil React ke direktori default NGINX
COPY dist/ /usr/share/nginx/html

# Expose port
EXPOSE 3000

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]