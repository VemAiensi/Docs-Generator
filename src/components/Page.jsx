import React, { useRef } from "react";
import html2canvas from "html2canvas";
import qrcode from "../assets/qrcode.png";
import sample from "../assets/out1.png";
import jsPDF from "jspdf";
import "./page.css";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";

const MyComponent = () => {
  const divRef = useRef(null);
  const javaCode = `package queues;

import java.util.Scanner;

public class Marasigan_CircularQueues 
{
	static Scanner in = new Scanner(System.in);
	//variables
	static int [] queue;
	static int rear=-1;
	static int front=-1;
	static int choice = 0;
	
	public static void main(String[] args) 
	{
		System.out.print("Enter the size of the Queue:\t");
		queue = new int[in.nextInt()];
		do 
		{	
			System.out.println();
			System.out.print("Menu\\n\\t1. Enqueue\\n\\t2. Dequeue\\n"
					+ "\\t3. Display Queue\\n\\t4. Exit\\nEnter Choice [1..4]: ");
			choice = in.nextInt();
			switch (choice)
			{
			case 1: Enqueue(); break;
			case 2: Dequeue(); break;
			case 3: //Display_Queue.CircleBeta();
					Display_Queue.ArrayPrint();
					Display_Queue.Status();
					break;
			case 4: Exit(); break;
			default: choice = 5; break;
			}
		}
		while (choice < 6 ); 
	}
	
	static void Enqueue()
	{
		
		System.out.println();
		System.out.println("\\t-=ENQUEUE=-");
		do 
		{
			System.out.print("Enter a number: ");
			int data = in.nextInt();
			int backup = rear;
			rear = (rear+1)% queue.length;
		
			if (front == rear)
			{
				System.out.println("Queue is full");
				rear = backup;
				choice = 0;
			}
			else
			{
				queue[rear] = data;
				System.out.print("Want to add more? Yes[1] No[0]: ");
				choice = in.nextInt();
			}
			if (front == -1)
			{
				front = 0; rear = 0;
			}
		}
		while (choice == 1);
		Display_Queue.ArrayPrint();
		Display_Queue.Status();
	}
	
	static void Dequeue()
	{
		System.out.println();
		System.out.println("\\t-=DEQUEUE=-");
		do 
		{
			if (front==-1)
			{
				System.out.println("Queue is empty");
			}
			else
			{
				System.out.print(queue[front] + " is removed");
				queue[front] = 0;
			}
			if (rear == front)
			{
				front= -1;
				rear = -1;
			}		
			else
			{
				front = (front+1)%queue.length;
			}
			
			System.out.print("\\nDo you want to Dequeue again? Yes[1] No[0]: ");
			choice = in.nextInt();
			
		}while (choice == 1);
		
		Display_Queue.ArrayPrint();
		Display_Queue.Status();
	}
	
	class Display_Queue
	{
		//Array printing
		static void ArrayPrint()
		{
			System.out.println();
			System.out.print("\\t+");
			for (int i = 0; i < queue.length; i++)
			{
				System.out.print("-------+");
			}
			System.out.println();
			
			System.out.print("QUEUE:\\t");
			System.out.print("|");
			for (int i = 0; i < queue.length; i++)
			{
				if (queue[i] == 0)
					System.out.print(" " + "\\t|");
				else
					System.out.print(queue[i] + "\\t|");
			}
			System.out.println();
			
			System.out.print("\\t+");
			for (int i = 0; i < queue.length; i++)
			{
				System.out.print("-------+");
			}
			System.out.println();
			
			System.out.print("INDEX:\\t");
			System.out.print("|");
			for (int i = 0; i < queue.length; i++)
			{
				System.out.print(i + "\\t|");
			}
			System.out.println();
			
			System.out.print("\\t+");
			for (int i = 0; i < queue.length; i++)
			{
				System.out.print("-------+");
			}
			System.out.println();
		}
			
		//Linear printing
		static void LinearPrint()
		{
			int i = front;
			if (i == -1)
			{
				System.out.println("Queue is Empty");
			}
			else
			{
				do
				{
				System.out.print(queue[i]);
				i= (i+1)%queue.length;
			
				if (i != (rear+1)%queue.length)
				System.out.print("-"); //prints dashes only in between
			
				}while (i != (rear+1)%queue.length);
				System.out.println();
			}
		}
		
		static void Status()
		{
			System.out.println();
			System.out.print("[Status]\\nQueue: ");
			Display_Queue.LinearPrint();
			
			
			System.out.print("Front index: " + front + "\\t\\t");
			if (Marasigan_CircularQueues.front == -1)
			{
			System.out.print("Data: No Data");
			}
			else
			{
				System.out.print("Data: " + queue[front]);
			}
			
			System.out.print("\\nRear  index: " + rear + "\\t\\t");
			if (Marasigan_CircularQueues.rear == -1)
			{
				System.out.print("Data: No Data");
			}
			else
			{
				System.out.print("Data: " + queue[rear]);
			}
			System.out.println();
		}
		
		static void CircleBeta()
		{
			System.out.println();
			System.out.println("   7    0");
			System.out.println("6   " + queue[0] + "  " + queue[1]+ "   1");
			System.out.println("  " +queue[2] + "      " + queue[3]);
			System.out.println("  "+ queue[4] + "      " +  queue[5]);
			System.out.println("5   " + queue[6] + "  " + queue[7] + "   2");
			System.out.println("   4    3");
		}
	}
	
	static void Exit()
	{
		System.out.println();
		System.out.println("\\tThank you po ^_^\\n"
				+ "   By: Marasigan, Vem Aiensi");
		System.exit(1);
	}
}`;

  // function escapeSpecialChars(str) {
  //   return str.replace(/[\\t\\n]/g, (match) => {
  //     if (match === "\\t") return "\\\\t";
  //     if (match === "\\n") return "\\\\n";
  //     return match; // Should not happen, but good practice
  //   });
  // }

  const generatePDF = () => {
    if (divRef.current) {
      const scale = 2; // Adjust scale for higher resolution

      html2canvas(divRef.current, { scale: scale })
        .then((canvas) => {
          const imgData = canvas.toDataURL("image/png");

          const pdf = new jsPDF("p", "mm", "letter"); // Portrait, millimeters, A4
          const width = pdf.internal.pageSize.getWidth();
          const height = pdf.internal.pageSize.getHeight();

          // Get canvas dimensions AFTER scaling
          const canvasWidth = canvas.width; // From html2canvas output
          const canvasHeight = canvas.height;

          // Calculate the available space on the PDF page (with margins)
          const availableWidth = width;
          const availableHeight = height;

          // Calculate the scaling factor to fit within the available space
          const scaleFactor = Math.min(
            availableWidth / canvasWidth, // Scale to fit width
            availableHeight / canvasHeight // Scale to fit height
          );

          // Calculate the image dimensions to maintain aspect ratio
          const imgWidth = canvasWidth * scaleFactor;
          const imgHeight = canvasHeight * scaleFactor;

          // Center the image
          const xPos = (width - imgWidth) / 2;
          const yPos = (height - imgHeight) / 2;

          pdf.addImage(imgData, "PNG", xPos, yPos, imgWidth, imgHeight);

          pdf.save("my-document.pdf");
        })
        .catch((error) => {
          console.error("Error generating PDF:", error);
        });
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: "10px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <div ref={divRef} className="page">
          <div className="title">
            <div className="text">
              <h1>QUEUES</h1>
              <p>
                <em>
                  Data Structures and Algoritthms - 2nd Sem A.Y. 2021-2022
                </em>
              </p>
            </div>
            <div className="qr">
              <img src={qrcode} alt="Placeholder" />
            </div>
          </div>

          <div className="content">
            <section>
              <span>Overview</span>
              <p>
                Tackles about how queues work as well as terms related to queues
                and apply it on code
              </p>
            </section>
            <section>
              <span>Objectives</span>
              <ul>
                <li>Enqueue</li>
                <li>Dequeue</li>
              </ul>
            </section>
            <section className="output">
              <span>Sample Output</span>
              <div className="sOut">
                <img src={sample} alt="" />
              </div>
            </section>
          </div>

          <div className="pNum-right">1</div>
        </div>

        <div className="page">
          <div className="srcCodeTitle">
            <div className="line"></div>
            <span>Source Code</span>
            <div className="line"></div>
          </div>

          <SyntaxHighlighter language="java" style={oneLight}>
            {javaCode}
          </SyntaxHighlighter>
        </div>
      </div>
      <button onClick={generatePDF}>Export to PDF</button>
    </div>
  );
};

export default MyComponent;
