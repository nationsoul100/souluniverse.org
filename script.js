<script>
        // JavaScript function to toggle between 'block' and 'none' display
        function toggleDisplay(elementId) {
            var x = document.getElementById(elementId);
            if (x.style.display === "none" || x.style.display === "") {
                x.style.display = "block";
            } else {
                x.style.display = "none";
            }
        }

        // JavaScript function to explicitly hide the content
        function hideContent(elementId) {
            document.getElementById(elementId).style.display = "none";
        }
    </script>