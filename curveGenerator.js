document.addEventListener("DOMContentLoaded", () => {
    var { A_slider, B_slider, a_slider, b_slider, phase_slider } = getSliders();
    var { A_label, B_label, a_label, b_label, phase_label } = getLabels();
    let A, B, a, b, phase, canvas;

    addSlidersEvents();
    updateValues();
    drawCurve(a, A, b, B, phase);

    function drawCurve(a, A, b, B, phase) {
        const canvasSize = 400;

        if (canvas) {
            canvas.selectAll('*').remove();
        }

        canvas = d3.select('#canvas')
            .attr('width', canvasSize)
            .attr('height', canvasSize)
            .style('background-color', '#111');
    
        t = 0.04;
        while (t < 10)
        {
            pointStart = calcPoint(a, A, b, B, phase, t);
            pointEnd = calcPoint(a, A, b, B, phase, t + 0.01);
    
            canvas.append('line')
             .style("stroke", "violet")
             .style("stroke-width", 2)
             .attr("x1", (canvasSize/2) + pointStart.x)
             .attr("y1", (canvasSize/2) - pointStart.y)
             .attr("x2", (canvasSize/2) + pointEnd.x)
             .attr("y2", (canvasSize/2) - pointEnd.y);
    
             t += 0.01;
        }
    }
    
    function calcPoint(a, A, b, B, phase, t) {
        let x = A * Math.sin((a*t) + phase);
        let y = B * Math.sin(b*t);
        return {x, y};
    }
    
    function getSliders() {
        var A_slider = document.getElementById("A-slider");
        var B_slider = document.getElementById("B-slider");
        var a_slider = document.getElementById("a-slider");
        var b_slider = document.getElementById("b-slider");    
        var phase_slider = document.getElementById("phase-slider");

        return { A_slider, B_slider, a_slider, b_slider, phase_slider };
    }

    function getLabels() {
        var A_label = document.getElementById("A-label");
        var B_label = document.getElementById("B-label");
        var a_label = document.getElementById("a-label");
        var b_label = document.getElementById("b-label");
        var phase_label = document.getElementById("phase-label");

        return { A_label, B_label, a_label, b_label, phase_label };
    }

    function addSlidersEvents() {
        addSliderEvent(A_slider);
        addSliderEvent(B_slider);
        addSliderEvent(a_slider);
        addSliderEvent(b_slider);
        addSliderEvent(phase_slider);
    }
    
    function addSliderEvent(slider) {
        slider.addEventListener("input", () => {
            updateValues();
            drawCurve(a, A, b, B, phase);
        });
    }

    function updateValues() {
        A = A_slider.value;
        B = B_slider.value;
        a = a_slider.value;
        b = b_slider.value;
        phase = phase_slider.value;
        A_label.innerHTML = A_slider.value;
        B_label.innerHTML = B_slider.value;
        a_label.innerHTML = a_slider.value;
        b_label.innerHTML = b_slider.value;
        phase_label.innerHTML = phase_slider.value;
    }
});