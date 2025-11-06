# Personal Portfolio Website

A modern, responsive portfolio website built with Streamlit showcasing professional experience, projects, skills, certifications, and education.

## Features

- **Sticky Navigation Bar**: Fixed navigation bar with smooth scrolling to different sections
- **Responsive Design**: Clean and modern layout with centered content
- **Project Showcase**: Display projects in a 3-column grid layout with technology stacks
- **Skills & Certifications**: Organized display of technical expertise and certifications
- **Work Experience**: Detailed work history with timeline
- **Education**: Academic background displayed in boxes
- **Contact Information**: Easy-to-access contact details

## Sections

1. **About Me**: Personal introduction and background
2. **Work Experience**: Professional roles at RedHat, Nokia, and ELTE
3. **Education**: Academic qualifications
4. **Skills & Certifications**: Technical skills and professional certifications
5. **Projects**: Portfolio of GitHub projects with technology stacks
6. **Contact**: Contact information and social links

## Technologies Used

- **Python**: Backend development
- **Streamlit**: Web framework for building the portfolio
- **HTML/CSS**: Custom styling and layout

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd personal-website/python
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

## Usage

Run the Streamlit application:

```bash
streamlit run test.py
```

The application will start on `http://localhost:8501` by default.

## Project Structure

```
portfolio/
├── test.py              # Main Streamlit application
├── requirements.txt     # Python dependencies
└── README.md           # Project documentation
```

## Customization

To customize the portfolio:

1. **Personal Information**: Update the `CONTACT_INFO` dictionary with your details
2. **Skills**: Modify the `SKILLS` dictionary to reflect your expertise
3. **Certifications**: Add or update certifications in the `CERTIFICATIONS` list
4. **Projects**: Update the `PROJECTS` list with your GitHub repositories
5. **Education**: Modify the `EDUCATION` list with your academic background
6. **Work Experience**: Update the work experience section with your professional history

## Features Implementation

- **Equal Height Boxes**: All boxes in the same row have equal heights for a clean look
- **Smooth Scrolling**: Navigation links smoothly scroll to respective sections
- **Hover Effects**: Interactive elements with hover states
- **Responsive Grid**: 3-column grid layout for projects, skills, and certifications
- **Sticky Navigation**: Navigation bar remains fixed at the top while scrolling

## License

This project is personal and proprietary.

## Author

**Mohammed Al-Dokimi**

- Email: mo.aldokimi@gmail.com
- LinkedIn: [linkedin.com/in/mohammed-al-dokimi-98ba411a5](https://linkedin.com/in/mohammed-al-dokimi-98ba411a5)

